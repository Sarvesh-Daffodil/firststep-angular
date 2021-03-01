import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  public loader: any = {
    show: false
  };
  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.loader = this.loaderService.loader;
  }
}
