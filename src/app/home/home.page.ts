import {Component} from '@angular/core';
import {DataService, Commands, CommandsDetail} from '../services/data.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    firstCommand: Commands;
    secondCommand: {value:null};
    thirdCommand: {value:null};
    command: CommandsDetail;

    constructor(private data: DataService) {
    }

    selectFirstCommand(event) {

        this.firstCommand = event.detail.value;
        this.secondCommand = undefined;
        this.thirdCommand = undefined;

        this.setCommand(this.firstCommand);

    }

    getFirstOptions(): Commands[] {
        return this.data.getCommands();
    }

    selectSecondCommand(event) {

        this.secondCommand = event.detail.value;
        this.thirdCommand = undefined;

        this.setCommand(this.secondCommand);

    }

    showSecondCommand() {
        let command = this.firstCommand;
        return (typeof command === 'object');
    }

    getSecondaryOptions(): CommandsDetail[] {
        let command = this.firstCommand;
        if (typeof command === 'object') {
            return this.data.getSecundaryCommands(command.value);
        }

        return [];
    }

    selectThirdCommand(event) {
        this.thirdCommand = event.detail.value;

        this.setCommand(this.thirdCommand);
    }

    showThirdCommand() {
        let command = this.secondCommand;

        let status = false;
        if (typeof command === 'object') {
            status = (typeof command['usage'] !== 'string');
        }

        return status;
    }

    getTertiaryCommands(): CommandsDetail[] {
        let command = this.secondCommand;
        if (typeof command === 'object') {
            return this.data.getTertiaryCommands(command['value']);
        }

        return [];
    }

    showCommand() {
        let status = false;
        if (typeof this.command === 'object') {
            status = true;
        }
        return status;
    }

    setCommand(command) {
        this.command = command;
    }

}
