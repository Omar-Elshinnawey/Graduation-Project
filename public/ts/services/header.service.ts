import { Injectable,EventEmitter } from '@angular/core';
import {MaterializeAction} from 'angular2-materialize/dist/index';

@Injectable()
export class HeaderService {
  visible: boolean;

  constructor() { this.visible = false; }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }
}