import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'select[soho-dropdown]', // tslint:disable-line
  template: '<ng-content></ng-content>',
  providers: [ NgModel ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoDropDownComponent implements AfterViewInit, OnDestroy {
  /**
   * Used to provide unnamed controls with a unique id.
   */
  private static counter = 0;

  /**
   * Local variables
   */

  /**
   * Selector for originating element.
   *
   * @private
   * @type {JQuery}
   * @memberOf SohoDropDownComponent
   */
  private jQueryElement: JQuery;

  /**
   * Reference to the Soho Api.
   */
  private dropdown: SohoDropDownStatic;

  /**
   * Block of options, use the accessors to modify.
   */
  private options: SohoDropDownOptions = {};

  /**
   * Sets the dropdown to close on selecting a value (helpful for multi-select)
   */
  @Input()
  public set closeOnSelect(closeOnSelect: boolean) {
    this.options.closeOnSelect = closeOnSelect;
    if (this.dropdown) {
      this.dropdown.settings.closeOnSelect = closeOnSelect;
      this.dropdown.updated();
    }
  }

  public get closeOnSelect(): boolean {
    return this.options.closeOnSelect;
  }

  /**
   * Append a css class to the dropdown-list
   */
  @Input()
  public set cssClass(cssClass: string) {
    this.options.cssClass = cssClass;
  }

  public get cssClass(): string {
    return this.options.cssClass;
  }

  /**
   * Typing debounce for search
   */
  @Input()
  public set delay(delay: number) {
    this.options.delay = delay;
  }

  public get delay(): number {
    return this.options.delay;
  }

  /**
   * Initialize the empty value
   */
  @Input()
  public set empty(empty: boolean){
    this.options.empty = empty;
  }

  public get empty(): boolean {
    return this.options.empty;
  }

  /**
   * Value of the maximum number of selected elements (must have multiple set to true)
   */
  @Input()
  public set maxSelected(maxSelected: number) {
    this.options.maxSelected = maxSelected;
  }

  public get maxSelected(): number {
    return this.options.maxSelected;
  }

  /**
   * Flag to move the selected values to the top of the dropdown
   */
  @Input()
  public set moveSelectedToTop(moveSelectedToTop: boolean) {
    this.options.moveSelectedToTop = moveSelectedToTop;
  }

  public get moveSelectedToTop(): boolean {
    return this.options.moveSelectedToTop;
  }

  /**
   * Sets the select element as a multi-select
   */
  @Input()
  public set multiple(multiple: boolean) {
    this.options.multiple = multiple;
    if (this.dropdown) {
      this.dropdown.settings.multiple = multiple;
      this.dropdown.updated();
    }
  }

  public get multiple(): boolean {
    return this.options.multiple;
  }

  /**
   * Name for the dropdown control. Necessary for ngModel to function.
   */
  @Input() name: string = `soho-dropdown-${SohoDropDownComponent.counter++}`;

  /**
   * Flag to add/remove search functionality from the dropdown
   */
  @Input()
  public set noSearch(noSearch: boolean) {
    // Assume any value is true to allow the noSearch attribute to be added
    // without a boolean value.
    const value = noSearch !== null && <any>noSearch !== 'false';
    this.options.noSearch = value;
    if (this.dropdown) {
      this.dropdown.settings.noSearch = value;
      this.dropdown.updated();
    }
  }

  public get noSearch(): boolean {
    return this.options.noSearch;
  }

  /**
   * Existent as a helper... should use framework's API to get data and
   * then create and pass to the control to use
   */
  @Input()
  public set source(source: SohoDropDownSourceFunction | Object | string ) {
    this.options.source = source;
  }

  public get source(): SohoDropDownSourceFunction | Object | string {
    return this.options.source;
  }

  /**
   * Called when the dropdown value changes
   */
  @Output()
  change: EventEmitter<JQueryEventObject> = new EventEmitter<JQueryEventObject>();

  /**
   * Called when the dropdown updates in some way.
   */
  @Output('updated') // tslint:disable-line
  updatedEvent: EventEmitter<Object> = new EventEmitter<JQueryEventObject>();

  /**
   * Bind attributes to the host select element
   */

  /**
   * Assign the id for the control
   * (maps to the name to use on a label's 'for' attribute)
   */
  @HostBinding('id') get id() {
    return this.name;
  }

  @HostBinding('attr.multiple') get isMultiple() {
    return this.options.multiple;
  }

  @HostBinding('class.dropdown') get isDropdown(): boolean{
    return !this.options.multiple;
  }

  @HostBinding('class.multiselect') get isMultiSelect() {
    return this.options.multiple;
  }

  constructor(private element: ElementRef, private model?: NgModel) {
    if (this.model) {
      this.model.valueChanges.subscribe(() => {
        // @BUG event causes the dropdown to be closed (even when closeOnSelect = false),
        // so as a workaround ignore changes if the dialog is open and close disabled.
        if (this.dropdown && !this.dropdown.isOpen() && this.dropdown.settings.closeOnSelect) {
          this.dropdown.updated();
        }
      });
    }
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.dropdown(this.options);
    this.jQueryElement
      .on('change', (event: JQueryEventObject) => this.onChange(event))
      .on('updated', (event: JQueryEventObject) => this.updatedEvent.emit(event));
    this.dropdown = this.jQueryElement.data('dropdown');
  }

  ngOnDestroy() {
    if (this.dropdown) {
      this.dropdown.destroy();
      this.dropdown = null;
    }
  }

  private onChange(event: any) {
    this.change.emit(event);
  }

  /**
   * In case options are being bound asynchronously, you will need to trigger updated on
   * soho dropdown control so it updates its value labels.
   */
  public updated(): SohoDropDownComponent {
    this.dropdown.updated();
    return this;
  }

  public disable(): void {
    this.dropdown.disable();
  }

  public enable(): void {
    this.dropdown.enable();
  }
}