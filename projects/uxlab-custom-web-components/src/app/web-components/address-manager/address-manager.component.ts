import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddressManagerService, State } from './address-manager.service';
import { Observable, Subject } from 'rxjs';

@Component({
    standalone: true,
    selector: "wc-address-manager",
    templateUrl: "address-manager.component.html",
    styleUrls: ["./address-manager.component.scss"],
    imports: [ReactiveFormsModule, CommonModule]
})
export class AddressManagerComponent implements OnInit, OnDestroy {
    addressForm!: FormGroup;
    states$!: Observable<State[]>;
    private destroy$ = new Subject<void>();
    submitting = false;
    
    @Output() submitted: EventEmitter<any>;

    public constructor(
        private fb: FormBuilder,
        private addressService: AddressManagerService,
        private cdr: ChangeDetectorRef
    ){
        this.submitted = new EventEmitter<any>();
    }

    public ngOnInit(): void {
        this.initForm();
        this.loadStates();
    }
    
    private initForm(): void {
        this.addressForm = this.fb.group({
            streetAddress: ['', Validators.required],
            streetAddress2: [''],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zipCode: ['', [
                Validators.required,
                Validators.pattern('^\\d{5}$')
            ]]
        });
    }
    
    private loadStates(): void {
        this.states$ = this.addressService.getStates();
    }
    
    public onSubmit(): void {
        if (this.addressForm.valid) {
            this.submitting = true;
            console.log('Form submitted:', this.addressForm.value);
            
            // Simulate API call
            setTimeout(() => {
                // Here you would typically send the data to a backend service
                this.submitting = false;
                // Reset form after successful submission
                //this.addressForm.reset();
                this.submitted.emit(this.addressForm.value);

                this.cdr.detectChanges();
            }, 1000);
        } else {
            this.markFormGroupTouched(this.addressForm);
        }
    }
    
    // Helper method to mark all controls as touched
    private markFormGroupTouched(formGroup: FormGroup): void {
        Object.values(formGroup.controls).forEach(control => {
            control.markAsTouched();
            if ((control as any).controls) {
                this.markFormGroupTouched(control as FormGroup);
            }
        });
    }

    public setFakeAddress(event: any){
        this.addressForm.patchValue({
            streetAddress: "12345 Isle Road",
            streetAddress2: "APT 20145",
            city: "Stanford",
            state: "AK",
            zipCode: "23547"
        })
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
