from socketclusterclient import Socketcluster
import pifacedigitalio
import logging
import json


class DoorLocker:

    def __init__(self):
        self.pfd = pifacedigitalio.PiFaceDigital()
        self.door_closed = True

    def open_door(self):
        self.pfd.leds[1].turn_on()
        self.door_closed = False

    def close_door(self):
        self.pfd.leds[1].turn_off()
        self.door_closed = True

    def door_status(self):
        if self.door_closed:
            return "Door close"
        elif not self.door_closed:
            return "Door open"
        else:
            return "Error"




class DoorService:

    def __init__(self):
        self.door = DoorLocker()
        self.socket = None
        pass

    def onconnect(self, socket):
        logging.info("on connect got called")

        socket.subscribe('ConnectMeTeam')
        socket.onchannel('ConnectMeTeam', self.channelmessage)
        self.socket = socket
        logging.debug("Bound to network")
        logging.info(socket.getsubscribedchannels())

    def ondisconnect(self, socket):
        logging.info('on disconnect got called')

    def onConnectError(self, socket, error):
        logging.info("On connect error")

    def onSetAuthentication(self, socket, token):
        logging.info('')

    def onAuthentication(self, socket, isauthenticated):
        logging.info("Authenticated is " + str(isauthenticated))

    def sendStatusUpdate(self):
        val = {}
        val["DoorStatus"] = self.door.door_status()
        self.socket.publish('ConnectMeTeam', str(val))

    def channelmessage(self, key, payload):
        logging.debug(str(payload))
        if key == "ConnectMeTeam":
            command = payload
            if 'event' in command:
                if command['event'] == "OpenDoor":
                    logging.debug("Open Door")
                    self.door.open_door()
                elif command['event'] == "CloseDoor":
                    logging.debug("Close Door")
                    self.door.close_door()
                else:
                    logging.error("Unknown command")

                self.sendStatusUpdate()


if __name__ == "__main__":
    service = DoorService()
    socket = Socketcluster.socket("ws://172.16.0.63:8000/socketcluster/")
    socket.setBasicListener(
        service.onconnect,
        service.ondisconnect,
        service.onConnectError)

    logging.debug("Connecting")
    socket.connect()
