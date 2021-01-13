#!/bin/bash -v


# for this folder.
#node ./../../../../bitbucket/wdingsoft/utis/index.nod.js


# gen index for bitbucket. 
TargetDir="../../"
APP="./utis/indexer/index.nod.js"
cd ${TargetDir}
ls -ls ${APP}
node ${APP} 
open index.htm
cd -

#back to this folder.
#node ./../../../bitbucket/wdingsoft/utis/index.nod.js







#################################
# for github
TargetDir="../../../../github/wdingsoft/"
APP="../../bitbucket/wdingsoft/utis/indexer/index.nod.js"

cd ${TargetDir}
ls -ls ${APP}

node ${APP}
open index.htm
cd -




########################
# for github
TargetDir="../../../../github/wdingbox/"
APP="../../bitbucket/wdingsoft/utis/indexer/index.nod.js"


cd ${TargetDir}
ls -ls ${APP}

node ${APP}
open index.htm
cd -






########################
# for github
TargetDir="../../../../github/wdingbox/homework/"
APP="../../../bitbucket/wdingsoft/utis/indexer/index.nod.js"


cd ${TargetDir}
ls -ls ${APP}

node ${APP}
open index.htm
cd -

#../../bitbucket/wdingsoft/utis/index.nod.js
