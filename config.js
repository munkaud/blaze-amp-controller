export const ConfigFields = [
    {
        type: 'textinput',
        label: 'IP Address',
        id: 'host',
        default: '192.168.1.100',
        required: true,
    },
    {
        type: 'number',
        label: 'Port',
        id: 'port',
        default: 80,
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