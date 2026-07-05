SRCS=	  extension/package.json
SRCS+=	extension/extension.js
SRCS+=	extension/myGdbDapConfigurationFactory.js
SRCS+=	extension/myGdbDapDescriptorFactory.js
SRCS+=	sample/launch.json

VSIX=	my-gdb-dap.vsix

ZIP=	zip
ZIP_OPT=	

all:
	@${ZIP} ${ZIP_OPT} ${VSIX} ${SRCS}
