import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '@/app/components/add-user/add-user.component';
import { UsersComponent } from '@/app/components/users/users.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { initialData } from '@/app/app.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatTabsModule,
    AddUserComponent,
    UsersComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Health-Challenge-Tracker';

  @ViewChild('usersComponent') usersComponent!: UsersComponent;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.initializeLocalStorage();
  }

  initializeLocalStorage() {
    if (!localStorage.getItem('workoutData')) {
      localStorage.setItem('workoutData', JSON.stringify(initialData));
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.usersComponent) this.usersComponent.loadUsers();
      }
    });
  }

}
