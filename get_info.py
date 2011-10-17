import socket

def get_info(host, port):
	#Set up our socket
	s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	s.connect((host, port))
	
	#Send 0xFE: Server list ping
	s.send('\xfe')
	
	#Read as much data as we can (max packet size: 241 bytes)
	d = s.recv(256)
	s.close()
	
	#Check we've got a 0xFF Disconnect
	assert d[0] == '\xff'
	
	#Remove the packet ident (0xFF) and the short containing the length of the string
	#Decode UCS-2 string
	#Split into list
	d = d[3:].decode('utf-16be').split(u'\xa7')
	
	#Return a dict of values
	return {'motd':            d[0],
	        'players':     int(d[1]),
	        'max_players': int(d[2])}


