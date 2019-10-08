import {Component, OnInit} from '@angular/core';
import {
  faUser,
  faHome,
  faBook,
  faClipboard,
  faChartPie,
  faStoreAlt,
  faBriefcase,
  faLaptopCode
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  faHome = faHome;
  faBook = faBook;
  faClipboard = faClipboard;
  faChartPie = faChartPie;
  faStoreAlt = faStoreAlt;
  faBriefcase = faBriefcase;
  faLaptopCode = faLaptopCode;
  faUser = faUser;

  constructor() {
  }

  ngOnInit() {
  }

}
