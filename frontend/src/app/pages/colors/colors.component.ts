import { Component, OnInit } from '@angular/core';
import { IColorsRes, IColor } from '../../model/http/colors.model';
import { ColorsService } from '../../services/colors.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'year', 'color', 'color_sample', 'pantone_value', 'actions'];
  data: IColor[] = [];

  constructor(private colors: ColorsService, private dataService: DataService) {
    this.colors.getColors().subscribe(res => {
      this.data = res.data;
    }, err => {
      this.dataService.setGeneralNotificationMessage(err);
    });
  }

  ngOnInit(): void {
  }

}
