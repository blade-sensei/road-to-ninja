import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { ProfileService } from '../../services/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    const userName = this.route.snapshot.paramMap.get('username');
    this.setupUser(userName);
  }

  setupUser(name) {
    this.userService.getUserByName(name).subscribe(user => {
      this.user = user;
    });
  }
}
