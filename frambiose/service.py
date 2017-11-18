from socketclusterclient import Socketcluster
import logging


class DoorService:

    def __init__(self):
        pass

    def onconnect(self, socket):
        logging.info("on connect got called")

        socket.subscribe('ConnectMeTeam')
        socket.onchannel('ConnectMeTeam', self.channelmessage)
        logging.info(socket.getsubscribedchannels())

    def ondisconnect(self, socket):
        logging.info('on disconnect got called')

    def onConnectError(self, socket, error):
        logging.info("On connect error")

    def onSetAuthentication(self, socket, token):
        logging.info('')

    def onAuthentication(self, socket, isauthenticated):
        logging.info("Authenticated is " + str(isauthenticated))

    def channelmessage(self, key, object):
        logging.info('There is something')
        #logging.info('Channelmessage ' + str(key) + " : " + str(object))


if __name__ == "__main__":
    service = DoorService()
    socket = Socketcluster.socket("ws://172.16.0.63:8000/socketcluster/")
    socket.setBasicListener(
        service.onconnect,
        service.ondisconnect,
        service.onConnectError)

    logging.debug("Connecting")
    socket.connect()
