import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { SharedNcatsDataDownloadModule } from '@ramp/shared/ncats/data-download';
import { SharedRampInputRowModule } from '@ramp/shared/ramp/input-row';
import { SharedRampPageCoreModule } from '@ramp/shared/ramp/page-core';
import { SharedRampQueryPageModule } from '@ramp/shared/ramp/query-page';
import { SharedUiDescriptionPanelModule } from '@ramp/shared/ui/description-panel';
import { SharedUiNcatsDatatableModule } from '@ramp/shared/ui/ncats-datatable';
import { OntologiesFromMetabolitesComponent } from './ontologies-from-metabolites/ontologies-from-metabolites.component';

const ROUTES: Routes = [
  {
    path: '',
    component: OntologiesFromMetabolitesComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedRampQueryPageModule,
    SharedRampInputRowModule,
    SharedRampPageCoreModule,
    SharedUiDescriptionPanelModule,
    FlexLayoutModule,
    MatButtonModule,
  ],
  declarations: [OntologiesFromMetabolitesComponent],
})
export class FeaturesRampOntologiesModule {}
