import {CommonModule, isPlatformBrowser} from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  PLATFORM_ID,
  signal,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {annotate} from 'rough-notation';
import {AnnotationAction, BracketType} from './ngx-highlighter.types';

@Component({
  selector: 'om-highlighter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngx-highlighter.component.html',
  styleUrl: './ngx-highlighter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxHighlighterComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('wrapper') wrapperRef!: ElementRef<HTMLElement>;

  @Input() action: AnnotationAction = 'highlight';
  @Input() color = '#d1daff';
  @Input() strokeWidth = 1.5;
  @Input() animationDuration = 600;
  @Input() iterations = 2;
  @Input() padding = 2;
  @Input() multiline = true;
  @Input() animateOnlyOnce = false;
  @Input() brackets: BracketType | BracketType[] = ['left', 'right'];
  @Input() animate = true;

  isInView = signal(false);

  private io?: IntersectionObserver;
  private annotation?: ReturnType<typeof annotate>;
  private animatedOnce = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.createAnnotation();

    this.io = new IntersectionObserver(([entry]) => {
      const inView = entry.isIntersecting;
      this.isInView.set(inView);

      if (inView && (!this.animateOnlyOnce || this.animateOnlyOnce && !this.animatedOnce)) {
        this.annotation?.show();
        this.animatedOnce = true;
      } else if (!this.animateOnlyOnce) {
        this.annotation?.hide();
      }
    });
    this.io.observe(this.wrapperRef.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isPlatformBrowser(this.platformId) || !this.wrapperRef?.nativeElement) return;
    if (['action', 'color', 'strokeWidth', 'animationDuration', 'iterations', 'padding', 'multiline']
      .some(k => k in changes)) {
      this.annotation?.remove();
      this.createAnnotation();
      if (this.isInView()) this.annotation?.show();
    }
  }

  private createAnnotation() {
    this.annotation = annotate(this.wrapperRef.nativeElement, {
      type: this.action,
      color: this.color,
      strokeWidth: this.strokeWidth,
      animationDuration: this.animationDuration,
      iterations: this.iterations,
      padding: this.padding,
      multiline: this.multiline,
      brackets: this.brackets,
      animate: this.animate,
    });
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
    this.annotation?.remove();
    this.annotation = undefined;
  }
}
