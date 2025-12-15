import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@NgModule({
  exports: [
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzCardModule,
    NzCollapseModule,
    NzStepsModule,
    NzStatisticModule,
    NzTagModule,
    NzIconModule,
    NzLayoutModule,
    NzMessageModule,
    NzNotificationModule,
    NzSpaceModule
  ]
})
export class ZorroModule {}
