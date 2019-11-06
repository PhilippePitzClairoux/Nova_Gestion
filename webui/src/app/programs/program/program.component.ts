import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BehaviorSubject, Observable } from 'rxjs';

import { ClientService } from './../../services/client.service';
import { MachineService } from './../../services/machine.service';
import { BlankService } from './../../services/blank.service';
import { ToolService } from './../../services/tool.service';
import { ProgramService } from './../../services/program.service';
import { Program } from './../../models/program.model';
import { Blank } from './../../models/blank';
import { Machine } from './../../models/machine';
import { Client } from './../../models/client';
import { Tool } from './../../models/tool';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  public pageTitle: string;
  public addingProgram = false;
  public program = new Program();

  public fcName: FormControl;
  public fcProgramme: FormControl;
  public fcTool: FormControl;
  public fcBlank: FormControl;
  public fcMachine: FormControl;

  public fg: FormGroup;
  public clientFg: FormGroup;

  public tools: Tool[] = [];
  public blanks: Blank[] = [];
  public machines: Machine[] = [];
  public clients: Client[] = [];

  public programSubject: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  public program$: Observable<Client[]>;

  constructor(private router: ActivatedRoute, private programService: ProgramService, private fb: FormBuilder,
    private toolService: ToolService, private blankService: BlankService,
    private machineService: MachineService, private clientService: ClientService) { }

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
    this.programService.addClientToProgram(this.program.idProgram, this.clientFg.controls.client.value.idClient).subscribe(result => {
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


  private initFgEmpty(): void {
    this.fg = this.fb.group({
      name: (this.fcName = new FormControl('')),
      file: (this.fcProgramme = new FormControl('')),
      tool: (this.fcTool = new FormControl('', Validators.required)),
      blank: (this.fcBlank = new FormControl('', Validators.required)),
      machine: (this.fcMachine = new FormControl('', Validators.required))
    });
  }

  private getAllLists(): void {
    this.toolService.getAll().subscribe(result => this.tools = result);
    this.blankService.getAll().subscribe(result => this.blanks = result);
    this.machineService.getAll().subscribe(result => this.machines = result);
    this.clientService.getAll().subscribe(result => this.clients = result);
  }

  private initPage(): void {
    const programId = +this.router.snapshot.paramMap.get('id');
    if (programId === 0) {
      this.pageTitle = 'Ajouter un programme';
      this.addingProgram = true;
    } else {
      this.pageTitle = 'Modifier un programme';
      this.programService.getProgramById(programId).subscribe(result => {
        this.program = result;
        this.programSubject.next(this.program.clients);
        this.fg.controls.name.setValue(this.program.name);
        if (this.program.file !== null) {
          this.fg.controls.file.setValue(this.program.file);
        }
        this.fg.controls.tool.setValue(this.tools.find(t => t.idTool === this.program.tool.idTool));
        if (this.program.blank !== null) {
          this.fg.controls.blank.setValue(this.blanks.find(t => t.idBlank === this.program.blank.idBlank));
        }
        if (this.program.machine !== null) {
          this.fg.controls.machine.setValue(this.machines.find(t => t.idMachine === this.program.machine.idMachine));
        }
      });
    }
  }
}
