import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/material-component/dialog/change-password/change-password.component';
import { ConfirmationComponent } from 'src/app/material-component/dialog/confirmation/confirmation.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class AppHeaderComponent {
 role:any

 constructor(
  private router:Router,
  private dialog:MatDialog,
  private userService:UserService
 ){

 }
logOut(){
  const dialogConfig=new MatDialogConfig();
  dialogConfig.data={
    message:"LogOut",
    confirmation:true
  }
  const dialogRef=this.dialog.open(ConfirmationComponent,dialogConfig);
  const sub=dialogRef.componentInstance.onEmitStatusChange.subscribe(
    (response)=>{
      dialogRef.close();
      localStorage.clear()
      //this.userService.logout();
      this.router.navigate(['/'])

    }
  )
}

changePassword(){

  const dialogConfig=new MatDialogConfig()
  dialogConfig.width="550px";

  this.dialog.open(ChangePasswordComponent,dialogConfig)
}


}
