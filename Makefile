SRCS=	  extension/package.json
SRCS+=	extension/extension.js
SRCS+=	extension/myGdbDapConfigurationFactory.js
SRCS+=	extension/myGdbDapDescriptorFactory.js
SRCS+=	extension/myGdbDapTemplateManager.js
SRCS+=	extension/template/launch.json
SRCS+=  extension/${README}

README=  README.md

VSIX=	my-gdb-dap.vsix

ZIP=	zip
ZIP_OPT=	

RM=			rm
RM_OPT=	-f
CP=			cp
CP_OPT=	-f

all: ${SRCS}
	@${RM} ${RM_OPT} ${VSIX}
	@${ZIP} ${ZIP_OPT} ${VSIX} ${SRCS}

extension/${README}: ${README}
	@${CP} ${CP_OPT} ${README} $@

clean:
	@${RM} ${RM_OPT} ${VSIX} extension/${README}
