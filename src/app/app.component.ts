import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


enum PersonType {
  User = "User",
  Admin = "Admin"
}
export interface UserData {
  name: string;
  creationDate: Date;
  type: PersonType;
}

const ELEMENT_DATA: UserData[] = [
  {
    name: 'Jack',
    creationDate:new Date('December 17, 1995 03:24:00'),
    type: PersonType.User
  },
  {
    name: 'Kent',
    creationDate: new Date('December 17, 2002 03:24:00'),
    type: PersonType.User,
  },
  {
    name: 'Malini',
    creationDate: new Date('August 17, 2022 03:24:00'),
    type: PersonType.User,
  },
  {
    name: 'Shalini',
    creationDate: new Date('August 17, 2022 03:24:00'),
    type: PersonType.Admin,
  },
  {
    name: 'Jack',
    creationDate:new Date('December 17, 1995 03:24:00'),
    type: PersonType.User
  },
  {
    name: 'Kent',
    creationDate: new Date('December 17, 2002 03:24:00'),
    type: PersonType.User,
  },
  {
    name: 'Malini',
    creationDate: new Date('August 17, 2022 03:24:00'),
    type: PersonType.User,
  },
  {
    name: 'Shalini',
    creationDate: new Date('August 17, 2022 03:24:00'),
    type: PersonType.Admin,
  },
  {
    name: 'Jack',
    creationDate:new Date('December 17, 1995 03:24:00'),
    type: PersonType.User
  },
  {
    name: 'Kent',
    creationDate: new Date('December 17, 2002 03:24:00'),
    type: PersonType.User,
  },
  {
    name: 'Malini',
    creationDate: new Date('August 17, 2022 03:24:00'),
    type: PersonType.User,
  },
  {
    name: 'Shalini',
    creationDate: new Date('August 17, 2022 03:24:00'),
    type: PersonType.Admin,
  },
  {
    name: 'Jack',
    creationDate:new Date('December 17, 1995 03:24:00'),
    type: PersonType.User
  },
  {
    name: 'Kent',
    creationDate: new Date('December 17, 2002 03:24:00'),
    type: PersonType.User,
  },
  {
    name: 'Malini',
    creationDate: new Date('August 17, 2022 03:24:00'),
    type: PersonType.User,
  },
  {
    name: 'Malini',
    creationDate: new Date('August 17, 2022 03:24:00'),
    type: PersonType.Admin,
  },
  {
    name: 'Shalini',
    creationDate: new Date('August 17, 2022 03:24:00'),
    type: PersonType.Admin,
  },
  {
    name: 'Jack',
    creationDate:new Date('December 17, 1995 03:24:00'),
    type: PersonType.User
  },
  {
    name: 'Kent',
    creationDate: new Date('December 17, 2002 03:24:00'),
    type: PersonType.User,
  },
  {
    name: 'Malini',
    creationDate: new Date('August 17, 2022 03:24:00'),
    type: PersonType.User,
  },
  {
    name: 'Shalini',
    creationDate: new Date('August 17, 2022 03:24:00'),
    type: PersonType.Admin,
  },

];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit  {
  displayedColumns: string[] = ['name', 'creation-date', 'type'];
  dataSource: MatTableDataSource<UserData>;
  selectedType: string ='';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // FormGroup for the filter
  filterForm = new FormGroup({
      SearchName: new FormControl(''),
      fromDate: new FormControl(),
      toDate: new FormControl(),
  });

  //FilterValues
  globalFilters = {
    searchValue: '',
    fromDate: '',
    toDate: '',
    selectedType:''
  }

 //Initialize the paginator and sort after the view initilizes
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Get the form data
  get SearchName() { return this.filterForm?.get('SearchName')?.value; }
  get fromDate() { return this.filterForm?.get('fromDate')?.value; }
  get toDate() { return this.filterForm?.get('toDate')?.value; }


  constructor() {

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);

    // Assign custom filter function
    this.dataSource.filterPredicate = this.customFilter()

  }

  customFilter (){
    let filterFunction = (data:any, filter:string) => {

      if(filter) {
        const allFilters= JSON.parse(filter);

        const searchFilterApplied = allFilters.searchValue && allFilters.searchValue.length > 0 ? true:false;
        const dateFilterApplied = allFilters.fromDate && allFilters.toDate?true:false;
        const typeFilterApplied = allFilters.selectedType && allFilters.selectedType.length > 0 ? true:false;

        if( searchFilterApplied || dateFilterApplied  || typeFilterApplied )
            if (searchFilterApplied && dateFilterApplied && typeFilterApplied) {

              return data.creationDate >= this.fromDate && data.creationDate <= this.fromDate &&
              data.name.toLowerCase().includes(allFilters.searchValue)&&
              data.type.toUpperCase() === this.selectedType;

            } else if(searchFilterApplied && dateFilterApplied ){

              return data.name.toLowerCase().includes(allFilters.searchValue)&&
              data.name.toLowerCase().includes(allFilters.searchValue);

            } else if(searchFilterApplied && typeFilterApplied ){

              return data.name.toLowerCase().includes(allFilters.searchValue) &&
              data.type.toUpperCase() === this.selectedType;

            } else if (dateFilterApplied && typeFilterApplied ){

              return data.creationDate >= this.fromDate && data.creationDate <= this.fromDate &&
              data.type.toUpperCase() === this.selectedType;

            } else if(searchFilterApplied ) {

              return data.name.toLowerCase().includes(allFilters.searchValue);

            } else if (dateFilterApplied) {

              return data.creationDate >= this.fromDate && data.creationDate <= this.toDate;

            } else if(typeFilterApplied){

              return data.type.toUpperCase() === this.selectedType;

            }
        // return dateFilterApplied?data.creationDate >= this.fromDate && data.creationDate <= this.fromDate:true &&
        //   searchFilterApplied? data.name.toLowerCase().includes(allFilters.searchValue):true &&
        //   typeFilterApplied? data.type.toUpperCase() === this.selectedType:true;
      }

      // If the filter is empty, return true to show all rows
      return true;
    }
    return filterFunction;
  }

  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.globalFilters.searchValue = filterValue.trim().toLowerCase()
    this.updateGlobalFilter()
  }

  applyDateFilter() {
    this.globalFilters.fromDate= this.fromDate;
    this.globalFilters.toDate = this.toDate;
    this.updateGlobalFilter()
  }

  applyTypeFilter(){
    this.globalFilters.selectedType = this.selectedType;
    this.updateGlobalFilter()
  }

  updateGlobalFilter(){
    const stringGlobalFilters = JSON.stringify(this.globalFilters);
    this.dataSource.filter = stringGlobalFilters;
  }

}
