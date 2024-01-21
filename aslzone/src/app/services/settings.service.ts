import { Injectable } from '@angular/core';

import { Settings } from '../models/Settings';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {
  settings: Settings = {
    allowRegistration: true,
    adminId: 'fbwZT405fnVEK08JWCnViDqMlav1'
  }

  constructor() {
    if (localStorage.getItem('settings') !== null) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
  }

  getSettings(): Settings {
    return this.settings;
  }

  changeSettings(settings: Settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
    this.settings = settings;
  }

  isAdmin(id: string): boolean {
    return id === this.settings.adminId;
  }
}