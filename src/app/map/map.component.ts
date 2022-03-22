import { Component, OnInit } from '@angular/core';
import { YaEvent, YaReadyEvent } from 'angular8-yandex-maps';
import { DataService} from 'src/app/data.service';
var tdata:any
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {


  constructor(private dataService: DataService) { }
  
  ngOnInit(): void {
    
    
  }
  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    const objectManagerOptions: ymaps.IObjectManagerOptions = {
      clusterize: true,
      gridSize: 30,
      clusterDisableClickZoom: false,
    };
    const objectManager = new ymaps.ObjectManager(objectManagerOptions);
    objectManager.clusters.options.set('preset', 'islands#yellowClusterIcons');
    event.target.geoObjects.add(objectManager);
    this.dataService.getData().subscribe((answer) => {
      answer.forEach( (data:any)=> {
        console.log(data);
        if(data.point)
        {
          console.log(data);
          objectManager.add({
            type: 'Feature',
            id: data.Id,
            geometry: {
              type: 'Point',
              coordinates: [data.point.slice(10,19),data.point.slice(0, 9)],
            },
            options: {
              "iconLayout": 'default#imageWithContent',
              "iconImageHref": 'assets/long-map.svg',
              "iconImageSize": [30, 42],
              "iconImageOffset": [-3, -42],
            },
            properties: {
              data,
              balloonContentHeader: data.Name,
              balloonContentBody: "Адресс: "+data.Adress+"",
              balloonContentFooter: "Телефон: "+data.Phone+"",
              hintContent: "Данные о "+data.Name+""
            }
            
          });
          
        }
        objectManager.objects.events.add('click',  (e) => {
          const objectId:any = e.get('objectId');
          const obj: any = objectManager.objects.getById(parseInt(objectId, 10));
          console.log(obj);
          
        });
      })
      
    });
    
      
    
    
  }
}
