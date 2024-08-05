// import {  faBars, faFlagUsa, faPlus, faSearch ,faExpand, } from '@fortawesome/free-solid-svg-icons';
// import { Component, ViewChild } from '@angular/core';
// import { MatSidenav } from '@angular/material/sidenav';
// import { HttpClient } from '@angular/common/http';
//
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//
//   title = 'myapp';
//   faBars = faBars;
//   faFlagUsa = faFlagUsa;
//   faPlus = faPlus;
//   faSearch = faSearch;
//   faExpand = faExpand;
//
//
//   @ViewChild('sidenav') sidenav!: MatSidenav;
//   task = { name: '', description: '' };
//   tasks: any[] = []; // Assume this is populated from your service
//   isEditing = false;
//
//   constructor(private http: HttpClient) {}
//
//   openSidebar() {
//     this.sidenav.open();
//   }
//
//   closeSidebar() {
//     this.sidenav.close();
//   }
//
//   onSubmit() {
//     const apiUrl = 'http://localhost:2030/post'; // Replace with your actual API endpoint
//     this.http.post(apiUrl, this.task).subscribe(
//       response => {
//         console.log('Task submitted successfully:', response);
//         this.task = { name: '', description: '' };
//         this.closeSidebar();
//         // Optionally refresh tasks list
//       },
//       error => {
//         console.error('Error submitting task:', error);
//       }
//     );
//   }
//
//   deleteTask(id: string) {
//     const apiUrl = `http://localhost:2030/delete/${id}`;
//     this.http.delete(apiUrl).subscribe(
//       response => {
//         console.log('Task deleted successfully:', response);
//         // Optionally refresh tasks list
//       },
//       error => {
//         console.error('Error deleting task:', error);
//       }
//     );
//   }
//
//   editTask(task: any) {
//     this.task = { ...task };
//     this.isEditing = true;
//     this.openSidebar();
//   }
// }


//
// import { Component, ViewChild, OnInit , ElementRef} from '@angular/core';
// import { MatSidenav } from '@angular/material/sidenav';
// import { HttpClient } from '@angular/common/http';
// import { faBars, faFlagUsa, faPlus, faSearch, faExpand , faCircleCheck} from '@fortawesome/free-solid-svg-icons';
//
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   title = 'myapp';
//   faBars = faBars;
//   faFlagUsa = faFlagUsa;
//   faPlus = faPlus;
//   faSearch = faSearch;
//   faExpand = faExpand;
//   faCircleCheck = faCircleCheck;
//   @ViewChild('taskNameInput') taskNameInput!: ElementRef;
//   ngAfterViewInit() {
//     this.taskNameInput.nativeElement.focus();
//   }
//
//   @ViewChild('sidenav') sidenav!: MatSidenav;
//   task = { name: '', description: '' };
//   tasks: any[] = [];
//   isEditing = false;
//
//   constructor(private http: HttpClient) {}
//
//   ngOnInit() {
//     this.loadTasks();
//   }
//
//   openSidebar() {
//     this.sidenav.open();
//   }
//
//   closeSidebar() {
//     this.sidenav.close();
//   }
//
//   onSubmit() {
//     const apiUrl = 'http://localhost:2030/post';
//     this.http.post(apiUrl, this.task).subscribe(
//       (response: any) => {
//         console.log('Task submitted successfully:', response);
//         this.loadTasks(); // Refresh task list
//         this.task = { name: '', description: '' };
//         this.closeSidebar();
//         this.isEditing = false;
//       },
//       error => {
//         console.error('Error submitting task:', error);
//       }
//     );
//   }
//
//   deleteTask(id: string) {
//     const apiUrl = `http://localhost:2030/delete/${id}`;
//     this.http.delete(apiUrl).subscribe(
//       (response: any) => {
//         console.log('Task deleted successfully:', response);
//         this.loadTasks(); // Refresh task list
//       },
//       error => {
//         console.error('Error deleting task:', error);
//       }
//     );
//   }
//
//   editTask(task: any) {
//     this.task = { ...task };
//     this.isEditing = true;
//     this.openSidebar();
//   }
//
//   private loadTasks() {
//     const apiUrl = 'http://localhost:2030/get';
//     this.http.get(apiUrl).subscribe(
//       (response: any) => {
//         this.tasks = response;
//       },
//       error => {
//         console.error('Error loading tasks:', error);
//       }
//     );
//   }
// }
























import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { HttpClient } from '@angular/common/http';
import { faBars, faFlagUsa, faPlus, faSearch, faExpand, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myapp';
  faBars = faBars;
  faFlagUsa = faFlagUsa;
  faPlus = faPlus;
  faSearch = faSearch;
  faExpand = faExpand;
  faCircleCheck = faCircleCheck;

  @ViewChild('taskNameInput') taskNameInput!: ElementRef;
  ngAfterViewInit() {
    this.taskNameInput.nativeElement.focus();
  }

  @ViewChild('sidenav') sidenav!: MatSidenav;
  task = { name: '', description: '' };
  sectionName = ''; // For adding section name
  tasks: any[] = [];
  sections: any[] = []; // To store sections
  isEditing = false;
  isAddingSection = false; // To track the mode

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadTasks();
    this.loadSections(); // Load sections on init
  }

  openSidebar(isSection: boolean) {
    this.isAddingSection = isSection;
    this.sidenav.open();
  }

  closeSidebar() {
    this.sidenav.close();
    this.isAddingSection = false;
  }

  onSubmit() {
    if (this.isAddingSection) {
      const apiUrl = 'http://localhost:2030/section';
      this.http.post(apiUrl, { name: this.sectionName }).subscribe(
        (response: any) => {
          console.log('Section added successfully:', response);
          this.loadSections(); // Refresh sections list
          this.sectionName = '';
          this.closeSidebar();
        },
        error => {
          console.error('Error adding section:', error);
        }
      );
    } else {
      const apiUrl = 'http://localhost:2030/post';
      this.http.post(apiUrl, this.task).subscribe(
        (response: any) => {
          console.log('Task submitted successfully:', response);
          this.loadTasks(); // Refresh task list
          this.task = { name: '', description: '' };
          this.closeSidebar();
          this.isEditing = false;
        },
        error => {
          console.error('Error submitting task:', error);
        }
      );
    }
  }


  deleteTask(id: string) {
    const apiUrl = `http://localhost:2030/delete/${id}`;
    this.http.delete(apiUrl).subscribe(
      (response: any) => {
        console.log('Task deleted successfully:', response);
        this.loadTasks(); // Refresh task list
      },
      error => {
        console.error('Error deleting task:', error);
      }
    );
  }

  editTask(task: any) {
    this.task = { ...task };
    this.isEditing = true;
    this.openSidebar(false);
  }

  private loadTasks() {
    const apiUrl = 'http://localhost:2030/get';
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.tasks = response;
      },
      error => {
        console.error('Error loading tasks:', error);
      }
    );
  }

  private loadSections() {
    const apiUrl = 'http://localhost:2030/get-sections';
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.sections = response;
      },
      error => {
        console.error('Error loading sections:', error);
      }
    );
  }
}











