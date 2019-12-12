import { ToastrService } from 'ngx-toastr';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

import {BehaviorSubject, Observable} from 'rxjs';

import {ClientService} from '../../services/client.service';
import {MachineService} from '../../services/machine.service';
import {BlankService} from '../../services/blank.service';
import {ToolService} from '../../services/tool.service';
import {ProgramService} from '../../services/program.service';
import {Program} from '../../models/program.model';
import {Blank} from '../../models/blank';
import {Machine} from '../../models/machine';
import {Client} from '../../models/client';
import {Tool} from '../../models/tool';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  public pageTitle: string;
  public addingProgram = false;
  public program = new Program();
  public myFile: any;

  public fcName: FormControl;
  public fcFile: FormControl;
  public fcTool: FormControl;
  public fcBlank: FormControl;
  public fcMachine: FormControl;

  public fg: FormGroup;
  public clientFg: FormGroup;

  public fcClientSearch: FormControl = new FormControl('');
  public fcMachineSearch: FormControl = new FormControl('');
  public fcBlankSearch: FormControl = new FormControl('');
  public fcToolSearch: FormControl = new FormControl('');

  public tools: Tool[] = [];
  public filteredTools: BehaviorSubject<Tool[]> = new BehaviorSubject<Tool[]>([]);
  public blanks: Blank[] = [];
  public filteredBlanks: BehaviorSubject<Blank[]> = new BehaviorSubject<Blank[]>([]);
  public machines: Machine[] = [];
  public filteredMachines: BehaviorSubject<Machine[]> = new BehaviorSubject<Machine[]>([]);
  public clients: Client[] = [];
  public filteredClients: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);

  public programSubject: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  public program$: Observable<Client[]>;

  constructor(private route: ActivatedRoute, private programService: ProgramService, private fb: FormBuilder,
              private toolService: ToolService, private blankService: BlankService, private nav: Router,
              private machineService: MachineService, private clientService: ClientService, private toastr: ToastrService) {
  }

  public ngOnInit(): void {
    this.program$ = this.programSubject.asObservable();
    this.programSubject.next(this.program.clients);
    this.initFgEmpty();
    this.clientFg = this.fb.group({
      client: new FormControl('', Validators.required),
    });
    this.getAllLists();
    this.initPage();
  }

  public addClient() {
    if (this.clientFg.invalid) {
      this.validateAllFields(this.clientFg);
      return;
    }
    this.programService.addClientToProgram(this.program.idProgram, this.clientFg.controls.client.value.idClient).subscribe(result => {
      if (this.program.clients === undefined) {
        this.program.clients = [];
      }
      this.program.clients = [...this.program.clients, this.clientFg.controls.client.value];
      this.programSubject.next(this.program.clients);
    });
  }

  public deleteClient(idClient: number) {
    this.programService.deleteClientOfProgram(this.program.idProgram, idClient).subscribe(() => {
      this.program.clients = this.program.clients.filter(t => t.idClient !== idClient);
      this.programSubject.next(this.program.clients);
    });
  }

  public onReturn(): void {
    this.nav.navigate(['/programs']);
  }

  public updateFileValue(files: any): void {
    this.myFile = files.item(0);
    this.fcFile.setValue(this.myFile.name);
  }

  public downloadFile(fileName: string): void {
    this.programService.downloadFile(fileName).subscribe(result => {

      const newBlob = new Blob([result], {type: 'application/pdf'});

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }

      const data = window.URL.createObjectURL(newBlob);

      const link = document.createElement('a');
      link.href = data;
      link.download = fileName;
      link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
    });
  }

  public onCreate(): void {
    if (this.fg.invalid || this.fcFile.value === '') {
      if (this.fcFile.value === '') {
        this.toastr.error(null, 'Vous devez fichier de programme');
      }
      this.validateAllFields(this.fg);
      return;
    }

    this.programService.addFileToprogram(this.myFile).subscribe(result => {

      this.fcFile.setValue('');

      const program = new Program();
      program.name = this.fg.controls.name.value;
      if (this.fg.controls.machine.value !== '') {
        program.machine = this.fg.controls.machine.value;
      }
      if (this.fg.controls.tool.value !== '') {
        program.tool = this.fg.controls.tool.value;
      }
      if (this.fg.controls.blank.value !== '') {
        program.blank = this.fg.controls.blank.value;
      }

      program.filePrograms = [
        {
          file: result
        }
      ];

      this.programService.createProgram(program).subscribe(prog => {
        this.addingProgram = false;
        this.pageTitle = 'Modifier un programme';
        this.program.idProgram = prog.idProgram;

        this.programService.getProgramById(this.program.idProgram).subscribe(r => {
          this.program = r;
          this.programSubject.next(this.program.clients);
          this.fg.controls.name.setValue(this.program.name);
          if (this.program.tool !== null) {
            this.fg.controls.tool.setValue(this.tools.find(t => t.idTool === this.program.tool.idTool));
          }
          if (this.program.blank !== null) {
            this.fg.controls.blank.setValue(this.blanks.find(t => t.idBlank === this.program.blank.idBlank));
          }
          if (this.program.machine !== null) {
            this.fg.controls.machine.setValue(this.machines.find(t => t.idMachine === this.program.machine.idMachine));
          }
        });

      });
    });
  }

  public onSave(): void {
    if (this.fg.invalid) {
      this.validateAllFields(this.fg);
      return;
    }
    const program = new Program();
    program.idProgram = this.program.idProgram;
    program.name = this.fg.controls.name.value;
    if (this.fg.controls.machine.value !== '') {
      program.machine = this.fg.controls.machine.value;
    }
    if (this.fg.controls.tool.value !== '') {
      program.tool = this.fg.controls.tool.value;
    }
    if (this.fg.controls.blank.value !== '') {
      program.blank = this.fg.controls.blank.value;
    }
    if (this.fcFile.value !== '') {
      this.programService.addFileToprogram(this.myFile).subscribe(result => {
        program.filePrograms = [
          {
            file: result
          }
        ];
        this.programService.updateProgram(program);
      });
    } else {
      this.programService.updateProgram(program);
    }
  }


  private initFgEmpty(): void {
    this.fg = this.fb.group({
      name: (this.fcName = new FormControl('', [Validators.required, Validators.minLength(1)])),
      file: (this.fcFile = new FormControl({value: '', disabled: true}, [ Validators.required, Validators.minLength(1) ])),
      tool: (this.fcTool = new FormControl('')),
      blank: (this.fcBlank = new FormControl('')),
      machine: (this.fcMachine = new FormControl('', Validators.required))
    });
  }

  private getAllLists(): void {
    this.toolService.getAll().subscribe(result => {
      this.tools = result;
      this.filteredTools.next(result);
    });
    this.blankService.getAll().subscribe(result => {
      this.blanks = result;
      this.filteredBlanks.next(result);
    });
    this.machineService.getAll().subscribe(result => {
      this.machines = result;
      this.filteredMachines.next(result);
    });
    this.clientService.getAll().subscribe(result => {
      this.clients = result;
      this.filteredClients.next(result);
    });
  }

  private initPage(): void {
    const programId = +this.route.snapshot.paramMap.get('id');
    if (programId === 0) {
      this.pageTitle = 'Ajouter un programme';
      this.addingProgram = true;
    } else {
      this.pageTitle = 'Modifier un programme';
      this.programService.getProgramById(programId).subscribe(result => {
        this.program = result;
        this.programSubject.next(this.program.clients);
        this.fg.controls.name.setValue(this.program.name);
        if (this.program.tool !== null) {
          this.fg.controls.tool.setValue(this.tools.find(t => t.idTool === this.program.tool.idTool));
        }
        if (this.program.blank !== null) {
          this.fg.controls.blank.setValue(this.blanks.find(t => t.idBlank === this.program.blank.idBlank));
        }
        if (this.program.machine !== null) {
          this.fg.controls.machine.setValue(this.machines.find(t => t.idMachine === this.program.machine.idMachine));
        }
      });
    }
  }

  private validateAllFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

  public filterClient(): void {
    if (this.fcClientSearch.value === '') {
      this.filteredClients.next(this.clients);
    } else {
      this.filteredClients.next(this.clients.filter(t => t.name.toLocaleLowerCase().includes(
        this.fcClientSearch.value.toLocaleLowerCase()
      )));
    }
  }

  public filterMachine(): void {
    if (this.fcMachineSearch.value === '') {
      this.filteredMachines.next(this.machines);
    } else {
      this.filteredMachines.next(
        this.machines.filter(t => t.name.toLocaleLowerCase().includes(this.fcMachineSearch.value.toLocaleLowerCase()))
      );
    }
  }

  public filterBlank(): void {
    if (this.fcBlankSearch.value === '') {
      this.filteredBlanks.next(this.blanks);
    } else {
      this.filteredBlanks.next(
        this.blanks.filter(t => t.name.toLocaleLowerCase().includes(this.fcBlankSearch.value.toLocaleLowerCase()))
      );
    }
  }

  public filterTool(): void {
    if (this.fcToolSearch.value === '') {
      this.filteredTools.next(this.tools);
    } else {
      this.filteredTools.next(
        this.tools.filter(t => t.name.toLocaleLowerCase().includes(this.fcToolSearch.value.toLocaleLowerCase()))
      );
    }
  }

  public resetClient(): void {
    this.filteredClients.next(this.clients);
  }

  public resetMachine(): void {
    this.filteredMachines.next(this.machines);
  }

  public resetBlank(): void {
    this.filteredBlanks.next(this.blanks);
  }

  public resetTool(): void {
    this.filteredTools.next(this.tools);
  }
}
