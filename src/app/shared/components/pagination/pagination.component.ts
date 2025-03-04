import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input() page: number = 1;
  @Input() limit: number = 6;
  @Input() totalPages: number = 5;

  @Output() pageChange = new EventEmitter<number>();

  arrPage = [1,2,3,4,5];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPages'] && changes['totalPages'].currentValue != changes['totalPages'].previousValue) {

      if(changes['totalPages'] && this.totalPages < 5 ) {
        this.arrPage = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        
      } else {
        this.arrPage = [1,2,3,4,5];
      }
    }
  }



  previousPage(): void {
    if (this.arrPage[0] > 1) {
      const startNewPage = this.arrPage[0] - 5;

      this.arrPage = Array.from({ length: 5 }, (_, i) => startNewPage + i);
      this.page = startNewPage + 4;
      this.pageChange.emit(this.page);
    }
  }

  nextPage(): void {
    if (this.arrPage[this.arrPage.length - 1] < this.totalPages) {
      const startNewPage = this.arrPage[this.arrPage.length - 1] + 1;

      if (startNewPage + 5 > this.totalPages && this.totalPages % 5 !== 0) {
        const lastLength = this.totalPages % 5;
        this.arrPage = Array.from({ length: lastLength }, (_, i) => startNewPage + i);
      } else {
        this.arrPage = Array.from({ length: 5 }, (_, i) => startNewPage + i);
      }

      this.page = startNewPage;
      this.pageChange.emit(this.page);
    }
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
