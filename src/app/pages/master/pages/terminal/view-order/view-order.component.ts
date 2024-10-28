import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TerminalService } from '../../../../../core/services/terminal/terminal.service';
import { SearchPipe } from '../../../../../core/pipe/search.pipe';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';
// Assign the virtual file system (vfs) for fonts
if (pdfFonts.pdfMake && pdfFonts.pdfMake.vfs) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
} else {
  console.error('pdfFonts.pdfMake.vfs is undefined or null');
}

@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzInputModule,
    NzDividerModule,
    NzTagModule,
    SearchPipe,
  ],
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.css',
  providers: [DatePipe],
})
export class ViewOrderComponent {
  tableList: any[] = [];
  loading: boolean = false;
  searchKeyword: string = '';
  currentDate: any;
  isSpinning: boolean[] = Array(this.tableList.length).fill(false);
  constructor(private service: TerminalService, private datePipe: DatePipe) {
    this.currentDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
  }

  ngOnInit(): void {
    this.getTableList();
  }

  getTableList() {
    this.loading = true;
    this.service.getTableList().subscribe({
      next: (res) => {
        this.tableList = res?.data?.getAllMerchantOrders;
        this.loading = false;
      },
    });
  }

  checkStatus(index: number, orderId: number) {
    this.isSpinning[index] = true;
    this.service.postStatus(orderId).subscribe({
      next: (res) => {
        // console.log(res);
        this.getTableList();
        this.isSpinning[index] = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  generatePDF() {
    const testImageDataUrl =
      'data:image/png;base64,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';
    const documentDefinition = {
      content: [
        {
          text: this.currentDate,
          absolutePosition: { x: 500, y: 20 },
          fontSize: 10,
        },
        {
          table: {
            widths: ['*'],
            body: [
              [
                {
                  image: testImageDataUrl,
                  fit: [100, 100] as [number, number],
                  alignment: 'center',
                  margin: [0, 0, 0, 20] as [number, number, number, number],
                  border: [false, false, false, false],
                },
              ],
            ],
          },
        },
        {
          text: 'Order Records:',
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 10] as [number, number, number, number],
        },
        {
          table: {
            headerRows: 1,
            widths: [
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
            ],
            body: [
              [
                {
                  text: 'MID',
                  style: 'tableHeader',
                  fillColor: '#fafafa',
                  border: [false, false, false, true],
                  alignment: 'center',
                  margin: [0, 8, 0, 8] as [number, number, number, number],
                  borderColor: ['#d7d7d7', '#d7d7d7', '#d7d7d7', '#d7d7d7'],
                  fontSize: 9,
                },
                {
                  text: 'Order Id',
                  style: 'tableHeader',
                  fillColor: '#fafafa',
                  border: [false, false, false, true],
                  alignment: 'center',
                  margin: [0, 8, 0, 8] as [number, number, number, number],
                  borderColor: ['#d7d7d7', '#d7d7d7', '#d7d7d7', '#d7d7d7'],
                  fontSize: 9,
                },
                {
                  text: 'Legal Name',
                  style: 'tableHeader',
                  fillColor: '#fafafa',
                  border: [false, false, false, true],
                  alignment: 'center',
                  margin: [0, 8, 0, 8] as [number, number, number, number],
                  borderColor: ['#d7d7d7', '#d7d7d7', '#d7d7d7', '#d7d7d7'],
                  fontSize: 9,
                },
                {
                  text: 'E-mail',
                  style: 'tableHeader',
                  fillColor: '#fafafa',
                  border: [false, false, false, true],
                  alignment: 'center',
                  margin: [0, 8, 0, 8] as [number, number, number, number],
                  borderColor: ['#d7d7d7', '#d7d7d7', '#d7d7d7', '#d7d7d7'],
                  fontSize: 9,
                },
                {
                  text: 'Customer service phone no.',
                  style: 'tableHeader',
                  fillColor: '#fafafa',
                  border: [false, false, false, true],
                  alignment: 'center',
                  margin: [0, 8, 0, 8] as [number, number, number, number],
                  borderColor: ['#d7d7d7', '#d7d7d7', '#d7d7d7', '#d7d7d7'],
                  fontSize: 9,
                },
                {
                  text: 'Operating as Name',
                  style: 'tableHeader',
                  fillColor: '#fafafa',
                  border: [false, false, false, true],
                  alignment: 'center',
                  margin: [0, 8, 0, 8] as [number, number, number, number],
                  borderColor: ['#d7d7d7', '#d7d7d7', '#d7d7d7', '#d7d7d7'],
                  fontSize: 9,
                },
                {
                  text: 'Adjudication Approval Status',
                  style: 'tableHeader',
                  fillColor: '#fafafa',
                  border: [false, false, false, true],
                  alignment: 'center',
                  margin: [0, 8, 0, 8] as [number, number, number, number],
                  borderColor: ['#d7d7d7', '#d7d7d7', '#d7d7d7', '#d7d7d7'],
                  fontSize: 9,
                },
                {
                  text: 'Status',
                  style: 'tableHeader',
                  fillColor: '#fafafa',
                  border: [false, false, false, true],
                  alignment: 'center',
                  margin: [0, 8, 0, 8] as [number, number, number, number],
                  borderColor: ['#d7d7d7', '#d7d7d7', '#d7d7d7', '#d7d7d7'],
                  fontSize: 9,
                },
              ],
              ...this.tableList.map((data) => [
                {
                  text: data.merchantID,
                  color: '#6c757d',
                  border: [false, false, false, true],
                  borderColor: ['#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0'],
                  alignment: 'center',
                  margin: [0, 8, 0, 8] as [number, number, number, number],
                  fontSize: 9,
                },
                {
                  text: data.monerisOrderId,
                  color: '#6c757d',
                  border: [false, false, false, true],
                  borderColor: ['#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0'],
                  alignment: 'center',
                  margin: [0, 8, 0, 8] as [number, number, number, number],
                  fontSize: 9,
                },
                {
                  text: data.legalName,
                  color: '#6c757d',
                  border: [false, false, false, true],
                  borderColor: ['#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0'],
                  alignment: 'center',
                  margin: [0, 8, 0, 8] as [number, number, number, number],
                  fontSize: 9,
                },
                {
                  text: data.email,
                  color: '#6c757d',
                  border: [false, false, false, true],
                  borderColor: ['#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0'],
                  alignment: 'center',
                  margin: [0, 8, 0, 8] as [number, number, number, number],
                  fontSize: 9,
                },
                {
                  text: data.customerServicePhoneNumber,
                  color: '#6c757d',
                  border: [false, false, false, true],
                  borderColor: ['#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0'],
                  alignment: 'center',
                  margin: [0, 8, 0, 8] as [number, number, number, number],
                  fontSize: 9,
                },
                {
                  text: data.operatingAsName,
                  color: '#6c757d',
                  border: [false, false, false, true],
                  borderColor: ['#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0'],
                  alignment: 'center',
                  margin: [0, 8, 0, 8] as [number, number, number, number],
                  fontSize: 9,
                },
                {
                  text: data.adjudicationApprovalStatus,
                  color: '#6c757d',
                  border: [false, false, false, true],
                  borderColor: ['#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0'],
                  alignment: 'center',
                  margin: [0, 8, 0, 8] as [number, number, number, number],
                  fontSize: 9,
                },
                {
                  text: data.status,
                  color: '#6c757d',
                  border: [false, false, false, true],
                  borderColor: ['#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0'],
                  alignment: 'center',
                  margin: [0, 8, 0, 8] as [number, number, number, number],
                  fontSize: 9,
                },
              ]),
            ],
          },
        },
      ],
    };
    pdfMake.createPdf(documentDefinition).open();
  }
}
