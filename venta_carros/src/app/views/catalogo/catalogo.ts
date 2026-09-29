import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table';

// Provide sample car data to be used by the template and component
export const CATALOG_DATA = {
  columns: ['make', 'model', 'year', 'price', 'mileage', 'stock'],
  rows: [
    { make: 'Toyota', model: 'Corolla', year: 2021, price: '$15,500', mileage: '25,000 km', stock: 5 },
    { make: 'Honda', model: 'Civic', year: 2020, price: '$16,200', mileage: '30,000 km', stock: 3 },
    { make: 'Ford', model: 'Focus', year: 2019, price: '$12,000', mileage: '45,000 km', stock: 4 },
    { make: 'Chevrolet', model: 'Cruze', year: 2018, price: '$10,500', mileage: '60,000 km', stock: 2 },
    { make: 'Nissan', model: 'Sentra', year: 2022, price: '$17,800', mileage: '18,000 km', stock: 6 },
    { make: 'Hyundai', model: 'Elantra', year: 2021, price: '$14,300', mileage: '22,000 km', stock: 7 },
  ],
};

@Component({
  standalone: true,
  imports: [TableComponent],
  selector: 'app-catalogo',
  styleUrls: ['./catalogo.css'],
  templateUrl: './catalogo.html',
})
export class Catalogo {
  columns = CATALOG_DATA.columns;
  cars = CATALOG_DATA.rows;
}
