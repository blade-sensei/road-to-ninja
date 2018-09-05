import { Component, OnInit } from '@angular/core';
import { UserProjectsService } from '../user-projects/user-projects.service';
import { UserService } from '../user/user.service';
import { User } from '../../models/user';
import { FilterProjectsService } from '../../services/filter/filter-projects.service';

@Component({
  selector: 'app-filter-projects',
  templateUrl: './filter-projects.component.html',
  styleUrls: ['./filter-projects.component.css']
})
export class FilterProjectsComponent implements OnInit {
  searchUserInput = '';
  statusFilter = '';
  constructor(
    private userProjectsService: UserProjectsService,
    private userService: UserService,
    private filterService: FilterProjectsService,
  ) { }

  ngOnInit() {
  }

  onFilterProjects() {
    const options = {};
    if (!(this.statusFilter === '')) {
      const filter = { status: this.statusFilter };
      Reflect.set(options, 'filter', filter);
    }

    if (this.searchUserInput) {
      Reflect.set(options, 'search', this.searchUserInput);
    }

    this.userService.getCurrentUser().subscribe((user: User) => {
      this.userProjectsService
        .getUserProjects(user.uid, options)
        .subscribe(projects => {
          this.filterService.setFilteredProjects(projects);
        });
    });
  }

}
