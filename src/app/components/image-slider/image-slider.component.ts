import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ProductResponse } from 'src/app/models/interface/product-response.interface';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {
  
  @Input() product!: ProductResponse;
  @Input() slides: string[] = [];
  
  @ViewChild('myDiv') private myDiv!: ElementRef<HTMLDivElement> ;
  
  currentIndex: number = 0;
  
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.scrollImg();
  }
  
  ngOnInit(): void {
    this.product.imageUrls = this.product.imageUrls.map(url => "http://localhost:8088/images/" + url);

    this.slides = this.product.imageUrls;
  }
  
  
  get currentWidth(): number {
    return this.myDiv.nativeElement.getBoundingClientRect().width;
  }

  goToNext(): void {
    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
      this.scrollImg();
    }
  }

  goToPrevious(): void {
    if (this.currentIndex > 0 ) {
      this.currentIndex--;
      this.scrollImg();
    }
  }

  scrollImg(): void {
    this.myDiv.nativeElement.scrollLeft = (this.currentWidth * this.currentIndex) ;
  }

  goToSlide(slideIndex: number): void {
    this.currentIndex = slideIndex;
    this.scrollImg();
  }
}
