import { Component, Input } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "../../Utils/Services/client.service";

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.css']
})
export class DetailClientComponent{

  @Input() detailClient : any;
  constructor(private route: ActivatedRoute, private clientService: ClientService)
  {
    this.detailClient = this.clientService.client;
  }

  ngOnInit(): void {
  }

}
