import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SearchService } from './search.service';
import { WeatherDto } from './searchModel';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult: WeatherDto | undefined;
  weatherForm!: FormGroup;
  loading = false;
  error = false
  recordFound!: boolean;
  city: string = '';
  constructor(private searchService: SearchService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.weatherForm = this.formBuilder.group({
      city: new FormControl()
    })
  }

  onSearch() {
    this.city = this.weatherForm.value.city;
    if (this.weatherForm.valid) {
      this.error = false;
      this.loading = true;
      this.searchService.search(this.city).subscribe(res => {
        this.searchResult = res;
        this.loading = false;
      }, error => {
        this.error = true;
        this.searchResult = undefined;
      })
    }


  }
}
