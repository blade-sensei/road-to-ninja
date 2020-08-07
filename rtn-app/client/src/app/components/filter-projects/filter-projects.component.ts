import { Component, OnInit } from '@angular/core';
import { UserProjectsService } from '../user-projects/user-projects.service';
import { UserService } from '../user/user.service';
import { User } from '../../models/user';
import { FilterProjectsService } from '../../services/filter/filter-projects.service';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-filter-projects',
  templateUrl: './filter-projects.component.html',
  styleUrls: ['./filter-projects.component.css'],
})
export class FilterProjectsComponent implements OnInit {
  searchUserInput = '';
  statusFilter = '';
  profileUsername = '';

  constructor(
    private userProjectsService: UserProjectsService,
    private userService: UserService,
    private filterService: FilterProjectsService,
    private profileService: ProfileService,
  ) {}

  ngOnInit() {
    this.subscribeForCurrentProfile();
  }

  onFilterProjects() {
    const options = {};
    Reflect.set(options, 'search', this.searchUserInput);
    this.filterService.setFilteredOptions(options);
  }

  subscribeForCurrentProfile() {
    this.profileService.getCurrentProfil().subscribe((profile: string) => {
      this.profileUsername = profile;
    });
  }

  isSearchFilled() {
    return this.searchUserInput !== '';
  }

  clearSearchField() {
    this.searchUserInput = '';
    this.onFilterProjects();
  }
}
