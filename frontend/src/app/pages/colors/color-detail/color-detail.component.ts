import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IColor } from 'src/app/model/http/colors.model';
import { ColorsService } from 'src/app/services/colors.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-color-detail',
  templateUrl: './color-detail.component.html',
  styleUrls: ['./color-detail.component.scss']
})
export class ColorDetailComponent implements OnInit {
  color?: IColor;

  constructor(private route: ActivatedRoute, private colors: ColorsService, private data: DataService) {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.colors.getColor(params.id).subscribe(res => {
          this.color = res.data;
        }, err => {
          this.data.setGeneralNotificationMessage(err);
        });
      }
    });
  }

  ngOnInit(): void {
  }

}
