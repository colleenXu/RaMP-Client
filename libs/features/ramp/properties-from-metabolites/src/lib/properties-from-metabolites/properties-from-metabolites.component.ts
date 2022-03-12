import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Properties, RampQuery } from '@ramp/models/ramp-models';
import { PageCoreComponent } from '@ramp/shared/ramp/page-core';
import { DataProperty } from '@ramp/shared/ui/ncats-datatable';
import {
  fetchPropertiesFromMetabolites,
  fetchPropertiesFromMetabolitesFile,
  RampFacade,
} from '@ramp/stores/ramp-store';
import { takeUntil } from "rxjs";
import { STRUCTURE_VIEWER_COMPONENT } from '../features-ramp-properties-from-metabolites.module';

@Component({
  selector: 'ramp-properties-from',
  templateUrl: './properties-from-metabolites.component.html',
  styleUrls: ['./properties-from-metabolites.component.scss'],
})
export class PropertiesFromMetabolitesComponent
  extends PageCoreComponent
  implements OnInit
{
  propertiesColumns: DataProperty[] = [
    new DataProperty({
      label: 'Source ID',
      field: 'chem_source_id',
      sortable: true,
    }),
    /*    new DataProperty({
      label: "Common Name",
      field: "common_name",
      sortable: true
    }),*/
    new DataProperty({
      label: 'Metabolite',
      field: 'imageUrl',
      customComponent: STRUCTURE_VIEWER_COMPONENT,
    }),
    /*    new DataProperty({
      label: "Smiles",
      field: "iso_smiles"
    }),*/
    new DataProperty({
      label: 'InCHI',
      field: 'inchi',
    }),
    new DataProperty({
      label: 'InCHI Key',
      field: 'inchi_key',
    }),
    new DataProperty({
      label: 'Molecular Formula',
      field: 'mol_formula',
    }),
    new DataProperty({
      label: 'Mass',
      field: 'monoisotop_mass',
      sortable: true,
    }),
    new DataProperty({
      label: 'Molecular Weight',
      field: 'mw',
      sortable: true,
    }),
  ];

  constructor(
    private ref: ChangeDetectorRef,
    protected rampFacade: RampFacade,
    protected route: ActivatedRoute
  ) {
    super(route, rampFacade);
  }

  ngOnInit(): void {
    this.rampFacade.properties$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
      (res: { data: Properties[]; query: RampQuery } | undefined) => {
        if (res && res.data) {
          this._mapData(res.data);
          this.matches = Array.from(new Set(res.data.map(prop => prop.chem_source_id.toLocaleLowerCase())));
          this.noMatches = this.inputList.filter((p:string) => !this.matches.includes(p.toLocaleLowerCase()));
        }
        if (res && res.query) {
          this.query = res.query;
        }
        this.ref.markForCheck();
      }
    );
  }

  fetchProperties(event: string[]): void {
    this.inputList = event.map(item => item.toLocaleLowerCase());
    this.rampFacade.dispatch(
      fetchPropertiesFromMetabolites({ metabolites: event })
    );
  }
  fetchPropertiesFile(event: string[]): void {
    this.rampFacade.dispatch(
      fetchPropertiesFromMetabolitesFile({ metabolites: event, format: 'tsv' })
    );
  }

  private _mapData(data: any): void {
    this.dataAsDataProperty = data.map((obj: Properties) => {
      const newObj: { [key: string]: DataProperty } = {};
      Object.entries(obj).map((value: any, index: any) => {
        newObj[value[0]] = new DataProperty({
          name: value[0],
          label: value[0],
          value: value[1],
        });
      });
      newObj.imageUrl.url = `${
        this.route.snapshot.data.renderUrl
      }?structure=${encodeURIComponent(obj.iso_smiles)}&size=150`;
      newObj.imageUrl.label = newObj.common_name.value;
      return newObj;
    });
  }
}