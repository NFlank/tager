export class CreateTaskDTO {
    readonly name: string
    readonly description: string
    readonly deadline: string
    readonly createdBy: string
    readonly assignedTo: string
    readonly group: string
    readonly wastedTime: string
    readonly notifyAt: string
}