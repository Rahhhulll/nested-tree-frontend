import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tree.html',
  styleUrls: ['./tree.css'],
})
export class Tree {
  @Input() nodes: any[] = [];
}
