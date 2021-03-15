import { AddPurchasesProvider } from './../../providers/add-purchases/add-purchases';
import { Loading, LoadingController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { File } from "@ionic-native/file";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { FilePath } from "@ionic-native/file-path";
import { Camera } from "@ionic-native/camera";

declare var cordova: any;

import { apiURL } from "../../apiurl";
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-service-info',
  templateUrl: 'service-info.html',
})
export class ServiceInfoPage {

  responseData : any;
  dataInfo: any;
  serviceName: string;
  filename: string;
  errorMessage: string;
  lastImage: string = null;
  loading: Loading;

  serviceData = {
    serviceType: "",
    name: "",
    email: "",
    message: "",
    cities: "",
    zimLicense: "",
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    private purchasesService: AddPurchasesProvider,
    private camera: Camera,
    private transfer: FileTransfer,
    private file: File,
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
    this.serviceName = this.navParams.get("service").name;
    console.log(this.serviceName);
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Select Image Source",
      buttons: [
        {
          text: "Load from Library",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: "Use Camera",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          },
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
    });
    actionSheet.present();
  }

  //////////////////////////////////////////////////
  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
    };

    // Get the data of an image
    this.camera.getPicture(options).then(
      (imagePath) => {
        // Special handling for Android library
        if (
          this.platform.is("android") &&
          sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
        ) {
          this.filePath.resolveNativePath(imagePath).then((filePath) => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf("/") + 1);
            let currentName = imagePath.substring(
              imagePath.lastIndexOf("/") + 1,
              imagePath.lastIndexOf("?")
            );
            this.copyFileToLocalDir(
              correctPath,
              currentName,
              this.createFileName()
            );
          });
        } else {
          var currentName = imagePath.substr(imagePath.lastIndexOf("/") + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf("/") + 1);
          this.copyFileToLocalDir(
            correctPath,
            currentName,
            this.createFileName()
          );
        }
      },
      (err) => {
        this.presentToast("Error while selecting image.");
      }
    );
  }
  //////////////////////////////////////////////////////////////////////////

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file
      .copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
      .then(
        (success) => {
          this.lastImage = newFileName;
        },
        (error) => {
          this.presentToast("Error while storing file.");
        }
      );
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: "bottom",
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return "";
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public add_service(serviceForm: NgForm) {
    // Destination URL
    var url = apiURL.BASE_URL + "add_hire";

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);

    // File name only
    var filename = this.lastImage;

    //append image key value pair to serviceData object
    this.serviceData["image"] = filename;

    // if image is provided then add hire //
    if(this.serviceData["image"]) {

        var options = {
          fileKey: "file",
          fileName: filename,
          chunkedMode: false,
          mimeType: "multipart/form-data",
          params: this.serviceData,
        };

        const fileTransfer: FileTransferObject = this.transfer.create();

        this.loading = this.loadingCtrl.create({
          content: "Submitting Hire Request...",
        });
        this.loading.present();

        console.log(this.serviceData);

        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(
          (data) => {
            this.loading.dismissAll();
            this.presentToast("Info succesfully submitted.");
            console.log(data);
            console.log(options);
            console.log(this.serviceData);
          },
          (err) => {
            this.loading.dismissAll();
            this.presentToast("Error while uploading info.");
            console.log(err);
            console.log(options);
            console.log(this.serviceData);
          }
        );
    } // end if
    
    else {

      let loader = this.loadingCtrl.create({
        content: "Submitting Purchase Request..",
      });
      loader.present();
  
      this.purchasesService.addPurchases(this.serviceData).subscribe(
        (result) => {
          this.responseData = result;

          if(JSON.stringify(this.responseData.error)){
          //show errors
          this.loading.dismiss();
          this.dataInfo = JSON.stringify(this.responseData.error).replace(/^"(.*)"$/, '$1');
          console.log("In error:", result);
          }
          console.log("Out error:", result);
          
          loader.dismiss();
          this.presentToast("Purchase Info succesfully submitted.");
          serviceForm.resetForm();
        },
        (error) => {
          loader.dismiss();
          console.log('Error', error);
          this.presentToast("Error while uploading info.");
        }
      );
    }

  } 

}
