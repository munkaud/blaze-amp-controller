import { InstanceBase, runEntrypoint, TCPHelper } from '@companion-module/base'

export async function setupConnection(instance) {
    if (instance.socket) {
        instance.socket.destroy()
        instance.log('info', 'Existing socket connection destroyed')
    }

    instance.reconnectTime = 3000 // 3 seconds reconnect delay

    instance.socket = new instance.net.Socket()

    instance.socket.on('connect', () => {
        instance.log('info', `Connected to ${instance.config.host}:${instance.config.port}`)
        instance.updateStatus('ok')
    })

    instance.socket.on('error', (err) => {
        instance.log('error', `Connection error: ${err.message}`)
        instance.updateStatus('error', err.message)

        // Retry connection after a short delay
        setTimeout(() => {
            instance.log('info', `Retrying connection...`)
            instance.socket.connect(instance.config.port, instance.config.host)
        }, instance.reconnectTime)
    })

    instance.socket.on('close', () => {
        instance.log('info', 'Connection closed')

        // Automatically attempt reconnection
        setTimeout(() => {
            instance.log('info', `Reconnecting after close...`)
            instance.socket.connect(instance.config.port, instance.config.host)
        }, instance.reconnectTime)
    })

    // Attempt to connect
    try {
        instance.log('info', `Attempting to connect to ${instance.config.host}:${instance.config.port}`)
        await instance.socket.connect(instance.config.port, instance.config.host)
    } catch (error) {
        instance.log('error', `Failed to initiate connection: ${error.message}`)
        throw error
    }
}

