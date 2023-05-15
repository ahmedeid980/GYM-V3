import { TestBed } from '@angular/core/testing';

import { AdminIntegrationService } from './admin-integration.service';

describe('AdminIntegrationService', () => {
  let service: AdminIntegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminIntegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
