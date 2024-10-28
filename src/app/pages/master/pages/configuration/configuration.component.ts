import { Component, inject } from '@angular/core';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { ConfigurationService } from '../../../../core/services/configuration/configuration.service';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../../../../core/pipe/search.pipe';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [
    CommonModule,
    NzSegmentedModule,
    NzTableModule,
    NzInputModule,
    NzDividerModule,
    NzSelectModule,
    FormsModule,
    NzDrawerModule,
    SearchPipe,
  ],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css',
})
export class ConfigurationComponent {
  private readonly service = inject(ConfigurationService);
  dropdownList!: any[];
  tableData!: any[];
  tableHeaders!: any[];
  selectedValue!: string;
  loading: boolean = false;
  searchKeyword: string = '';

  ngOnInit(): void {
    this.loading = true;
    this.service.getDropDownList().subscribe({
      next: (res) => {
        this.selectedValue = res?.data[0]?.tableName;
        this.dropdownList = res?.data;
        this.service.getTableData(this.selectedValue).subscribe({
          next: (res) => {
            this.tableData = res?.data?.data;
            this.tableHeaders = res?.data?.headers;
            this.loading = false;
            console.log(res?.data);
          },
        });
      },
    });
  }
  changeListName(value: any) {
    this.loading = true;
    this.service.getDropDownList().subscribe({
      next: (res) => {
        this.dropdownList = res?.data;
        this.service.getTableData(value).subscribe({
          next: (res) => {
            this.tableData = res?.data?.data;
            this.tableHeaders = res?.data?.headers;
            this.loading = false;
            console.log(res?.data);
          },
        });
      },
    });
  }

  handleIndexChange(e: number): void {
    console.log(e);
  }

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
