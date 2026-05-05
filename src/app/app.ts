import { Component, OnInit } from '@angular/core';
import { Member } from './services/member';
import { CommonModule } from '@angular/common';
import { Tree } from './components/tree/tree';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, Tree],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {

  members: any[] = [];
  flatMembers: any[] = [];

  name: string = '';
  selectedParent: any = null;

  showPopup = false; // ✅ only one

  constructor(private memberService: Member) {}

  ngOnInit() {
    this.loadMembers();
  }

  // 🔥 BUILD TREE
  buildTree(data: any[], parentId: any = null): any[] {
    return data
      .filter(item => item.parentId === parentId)
      .map(item => ({
        ...item,
        children: this.buildTree(data, item._id)
      }));
  }

  // 🔥 LOAD DATA
  loadMembers() {
    this.memberService.getMembers().subscribe((data: any[]) => {
      this.flatMembers = data;
      this.members = this.buildTree(data);
    });
  }

  // 🔥 ADD MEMBER (NO RELOAD)
  addMember() {
    if (!this.name) return;

    const data = {
      name: this.name,
      parentId: this.selectedParent
    };

    this.memberService.addMember(data).subscribe((res: any) => {

      // ✅ direct update (IMPORTANT)
      this.flatMembers.push(res);
      this.members = this.buildTree(this.flatMembers);

      // reset
      this.name = '';
      this.selectedParent = null;
      this.showPopup = false;
    });
  }

  // 🔥 POPUP CONTROL
  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
}