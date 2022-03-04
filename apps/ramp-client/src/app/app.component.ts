import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '@ramp/shared/ui/error-dialog';
import { LinkTemplateProperty } from '@ramp/shared/ui/header-template';
import { RampFacade } from '@ramp/stores/ramp-store';

@Component({
  selector: 'ramp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'ramp-client';
  loading = true;
  links: LinkTemplateProperty[] = [
    {
      link: 'Biological Pathways',
      children: [
        {
          link: 'analytes-from-pathways',
          label: 'Analytes from Pathways',
        },
        {
          link: 'pathways-from-analytes',
          label: 'Pathways from Analytes',
        }
      ],
    },
    {
      link: 'Chemical Classes',
      children: [
        {
          link: 'classes-from-metabolites',
          label: 'Chemical Classes from Metabolites',
        },
        {
          link: 'properties-from-metabolites',
          label: 'Chemical Properties from Metabolites',
        },
      ],
    },
    {
      link: 'Ontologies',
      children: [
        {
          link: 'ontologies-from-metabolites',
          label: 'Ontologies from Metabolites',
        },
        {
          link: 'metabolites-from-ontologies',
          label: 'Metabolites from Ontologies',
        },
      ],
    },
    {
      link: 'Reactions',
      children: [
        {
          link: 'common-reaction-analytes',
          label: 'Common Reaction Analytes',
        }
        ]
    },
    {
      link: 'Enrichment Analyses',
      children: [
        {
          link: 'pathway-enrichment',
          label: 'Pathway Enrichment Analysis',
        },
        {
          link: 'chemical-enrichment',
          label: 'Chemical Enrichment Analysis',
        },
      ],
    },
    {
      link: 'about',
      label: 'About',
    },
    {
      link: 'https://ramp-api-alpha.ncats.io/__docs__/',
      label: 'API',
      external: true
    },
  ];

  constructor(
    public dialog: MatDialog,
    private changeRef: ChangeDetectorRef,
    protected rampFacade: RampFacade
  ) {}

  ngOnInit() {
    this.rampFacade.error$.subscribe((error) => {
      if (error) {
        console.log(error);
        /* this.dialog.open(ErrorDialogComponent, {
          data: {
            error: error,
          },
        });*/
      }
    });

    this.rampFacade.loading$.subscribe((res) => {
      this.loading = res;
      this.changeRef.markForCheck();
    });

    //  this.rampFacade.init();
  }
}
