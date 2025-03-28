export function getConfigFields() {
    return [
        {
            type: 'textinput',
            label: 'B100 IP Address',
            id: 'host',
            width: 6,
            default: '192.168.1.100',
            required: true,
        },
        {
            type: 'number',
            label: 'Port',
            id: 'port',
            default: 11000,
            required: true,
        },
        {
            type: 'dropdown',
            label: 'Protocol',
            id: 'prot',
            default: 'tcp',
            choices: [
                { id: 'tcp', label: 'TCP' },
                { id: 'udp', label: 'UDP' }
            ],
            required: true,
        },
    ]
}
