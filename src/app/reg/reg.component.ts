import { Component, OnInit } from '@angular/core';
import { DataService} from 'src/app/data.service';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
      
    
    
    
  }
  SendForm(name: string, Phone:string, Adress:any, Region:any): void {
    const data = {     
      name: name,  
      Phone: Phone,    
      Adress: Adress,
      Region: Region
    };
  
    this.dataService.SendDataForm(data).subscribe((data) => {
      if(data.name) {
        alert('успех');
      } else {
        alert('проблема');
      }
    });
  
  
  }
}
