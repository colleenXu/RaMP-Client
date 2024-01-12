import { Component, Input } from '@angular/core';
import { DataProperty } from '../../models/data-property';

/**
 * component to display a property, primarily in a table
 */
@Component({
  selector: 'ncats-property-display',
  templateUrl: './property-display.component.html',
  styleUrls: ['./property-display.component.scss'],
})
export class PropertyDisplayComponent {
  /**
   * show the label/field name
   * @type {boolean}
   */
  @Input() showLabel = true;

  @Input() displayType?:
    | 'string'
    | 'number'
    | 'externalLink'
    | 'internalLink'
    | 'date';
  /**
   * property object being shown
   */
  @Input() property!: DataProperty;

  fetchDisplayType(): string {
    let ret = 'string';
    if (this.displayType) {
      ret = this.displayType;
    } else {
      if (this.property) {
        if (this.property.url) {
          if (this.property.internalLink) {
            ret = 'internalLink';
          } else {
            ret = 'externalLink';
          }
        }
        if (
          Number.isNaN(this.property.value) ||
          Number.isInteger(this.property.value)
        ) {
          ret = 'number';
        }
      }
    }
    return ret;
  }

  isArray(data: any) {
    return Array.isArray(data);
  }
}
