import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private navigationExpandedSubject = new BehaviorSubject<boolean>(true);
  
  constructor() { }
  
  /**
   * Get the current navigation expanded state
   */
  get navigationExpanded$(): Observable<boolean> {
    return this.navigationExpandedSubject.asObservable();
  }
  
  /**
   * Get the current navigation expanded state value
   */
  get navigationExpanded(): boolean {
    return this.navigationExpandedSubject.value;
  }
  
  /**
   * Toggle the navigation expanded state
   */
  toggleNavigation(): void {
    this.navigationExpandedSubject.next(!this.navigationExpandedSubject.value);
  }
  
  /**
   * Set the navigation expanded state
   */
  setNavigationExpanded(expanded: boolean): void {
    this.navigationExpandedSubject.next(expanded);
  }
}
