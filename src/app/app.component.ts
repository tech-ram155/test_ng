import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { FormDataService } from './services/form-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup;
  formSubmissionStatus: string = '';

  constructor(private fb: FormBuilder, private formService: FormDataService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      file: [null, Validators.required]
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = <File>event.target.files[0];
      this.form.patchValue({
        file: file        
        
      });
     // console.log(file);
      
    }
  }

  onSubmit() {
    if (this.form.valid) {
      // Create a new FormData object
      const formData = new FormData();

    
      // Append form fields and file to the FormData object
      formData.append('name', this.form.get('name')?.value);
      formData.append('email', this.form.get('email')?.value);
      formData.append('file',this.form.get('file')?.value) 
      
      formData.forEach((value, key) => {
        console.log(key,value);
        
      });
      // Send the FormData object to the service for submission
      this.formService.onSubmitData(formData).subscribe(
        response => {
          console.log('Form submitted successfully', response);
        },
        error => {
          console.error('Error submitting form', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  
  
}
