import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
oldPassword=true
newPassword=true
confirmPassword=true
public showPassword: boolean = false;
changePasswordForm:any=FormGroup;
responseMessage:any
  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private  dialogRef:MatDialogRef<ChangePasswordComponent>,
    private ngxService:NgxUiLoaderService,
    private snackbarrService:SnackbarService
  ) { }

  ngOnInit(): void {
    this.changePasswordForm=this.formBuilder.group(
      {
        oldPassword:[null,Validators.required],
        newPassword:[null,Validators.required],
        confirmPassword:[null,Validators.required],
      }
    )
  }
  validateSubmit(){
        
    if(this.changePasswordForm.controls.newPassword?.value !== this.changePasswordForm.controls.confirmPassword?.value||this.changePasswordForm.controls.confirmPassword?.value==null ){
   
    return true}
  else{

    return false;

  }
  }

  handleSubmit(){
    this.ngxService.start();
    var formData=this.changePasswordForm.value;
    var data={
    oldPassword:formData.oldPassword,
    newPassword:formData.newPassword,
   // confirmPassword:formData.confirmPassword,
    }

    this.userService.changePassword(data).subscribe(
      (res:any)=>{
        this.ngxService.stop();
        this.responseMessage=res?.message;
        this.dialogRef.close()
        this.snackbarrService.openSnackBar(this.responseMessage,"success")
      },(err)=>{
        console.log(err)
        this.ngxService.stop()
        if(err.err?.message){
            this.responseMessage=err.err?.message

        }else{
          this.responseMessage="Something went wrong";
        }
        this.snackbarrService.openSnackBar(this.responseMessage,GlobalConstants.error)

        }
  )}

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
