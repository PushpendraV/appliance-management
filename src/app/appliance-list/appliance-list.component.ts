import { Component, OnInit } from '@angular/core';
import { Appliance } from '../models/appliance.model';
import { ApplianceService } from '../services/appliance.service';

@Component({
  selector: 'app-appliance-list',
  templateUrl: './appliance-list.component.html',
  styleUrls: ['./appliance-list.component.css']
})
export class ApplianceListComponent implements OnInit {
 appliances: Appliance[] = [];
  filteredAppliances: Appliance[];
  searchFilters: any = {
    serialNumber: '',
    brand: '',
    model: '',
    status: '',
    dateBought: ''
  };
  appliance: Appliance = {
    serialNumber: '',
    brand: '',
    model: '',
    status: '',
    dateBought: ''
  };
  isEdit: boolean = false;

  constructor(private applianceService: ApplianceService) {
    this.filteredAppliances = [];
   }

  ngOnInit(): void {
    this.getAllAppliances();
  }

  getAllAppliances(): void {
    this.applianceService.getAllAppliances().subscribe(
      (appliances) => {
        this.appliances = appliances;
        this.filteredAppliances = appliances;
      },
      (error) => {
        console.error('Error fetching appliances', error);
      }
    );
  }

  applyFilters(): void {
    this.filteredAppliances = this.appliances.filter(appliance =>
      appliance.serialNumber.toLowerCase().includes(this.searchFilters.serialNumber.toLowerCase()) &&
      appliance.brand.toLowerCase().includes(this.searchFilters.brand.toLowerCase()) &&
      appliance.model.toLowerCase().includes(this.searchFilters.model.toLowerCase()) &&
      appliance.status.toLowerCase().includes(this.searchFilters.status.toLowerCase()) &&
      appliance.dateBought.toLowerCase().includes(this.searchFilters.dateBought.toLowerCase())
    );
  }

  clearFilters(): void {
    this.searchFilters = {
      serialNumber: '',
      brand: '',
      model: '',
      status: '',
      dateBought: ''
    };
    this.filteredAppliances = this.appliances;
  }

  createNewAppliance(): void {
    this.appliance = {
      serialNumber: '',
      brand: '',
      model: '',
      status: '',
      dateBought: ''
    };
    this.isEdit = false;
  }

  editAppliance(appliance: Appliance): void {
    this.appliance = { ...appliance };
    this.isEdit = true;
  }
  updateAppliance(): void {
    if (this.appliance.id !== undefined) {
      this.applianceService.updateAppliance(this.appliance.id, this.appliance).subscribe(
        (updatedAppliance) => {
          // Update the appliance in the filteredAppliances array
          const index = this.filteredAppliances.findIndex((appliance) => appliance.id === updatedAppliance.id);
          if (index !== -1) {
            this.filteredAppliances[index] = updatedAppliance;
          }
          // Reset the form and editing state
          this.appliance = {
            id: undefined,
            serialNumber: '',
            brand: '',
            model: '',
            status: '',
            dateBought: '',
          };
          this.isEdit = false;
        },
        (error) => {
          console.error('Error updating appliance', error);
        }
      );
    } else {
      console.error('Cannot update appliance with undefined ID.');
    }
  }
  saveAppliance(): void {
    if (this.isEdit) {
      this.updateAppliance();
    } else {
      this.applianceService.createAppliance(this.appliance).subscribe(
        () => {
          this.getAllAppliances();
          this.cancel();
        },
        (error) => {
          console.error('Error creating appliance', error);
        }
      );
    }
  }

  cancel(): void {
    this.appliance = {
      serialNumber: '',
      brand: '',
      model: '',
      status: '',
      dateBought: ''
    };
    this.isEdit = false;
  }

  deleteAppliance(id: number): void {
    if (confirm('Are you sure you want to delete this appliance?')) {
      this.applianceService.deleteAppliance(id).subscribe(
        () => {
          this.getAllAppliances();
        },
        (error) => {
          console.error('Error deleting appliance', error);
        }
      );
    }
  }
}
