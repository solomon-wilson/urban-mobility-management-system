"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  FileText,
  Plus,
  Upload,
  X,
} from "lucide-react";

interface ComplianceModuleProps {
  operatorId?: string;
}

const ComplianceModule = ({
  operatorId = "OP-12345",
}: ComplianceModuleProps) => {
  const [activeTab, setActiveTab] = useState("inspections");
  const [showNewInspectionForm, setShowNewInspectionForm] = useState(false);
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);

  return (
    <div className="w-full bg-background p-4 rounded-lg border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Compliance Management</h2>
          <p className="text-muted-foreground">
            Manage inspections, violations, penalties, and documents
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" /> History
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
          <TabsTrigger value="violations">Violations</TabsTrigger>
          <TabsTrigger value="penalties">Penalties</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Inspections Tab */}
        <TabsContent value="inspections">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Digital Inspection Forms</h3>
            <Button onClick={() => setShowNewInspectionForm(true)}>
              <Plus className="mr-2 h-4 w-4" /> New Inspection
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Inspection ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Inspector</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: "INS-001",
                      date: "2023-05-15",
                      inspector: "John Doe",
                      type: "Vehicle Safety",
                      status: "Completed",
                    },
                    {
                      id: "INS-002",
                      date: "2023-06-22",
                      inspector: "Jane Smith",
                      type: "License Verification",
                      status: "Pending",
                    },
                    {
                      id: "INS-003",
                      date: "2023-07-10",
                      inspector: "Robert Johnson",
                      type: "Emissions Test",
                      status: "Failed",
                    },
                  ].map((inspection) => (
                    <TableRow key={inspection.id}>
                      <TableCell>{inspection.id}</TableCell>
                      <TableCell>{inspection.date}</TableCell>
                      <TableCell>{inspection.inspector}</TableCell>
                      <TableCell>{inspection.type}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            inspection.status === "Completed"
                              ? "default"
                              : inspection.status === "Failed"
                                ? "destructive"
                                : "outline"
                          }
                        >
                          {inspection.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* New Inspection Form Dialog */}
          <Dialog
            open={showNewInspectionForm}
            onOpenChange={setShowNewInspectionForm}
          >
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Inspection</DialogTitle>
                <DialogDescription>
                  Fill out the inspection details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="inspectionType">Inspection Type</Label>
                    <Select>
                      <SelectTrigger id="inspectionType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vehicle-safety">
                          Vehicle Safety
                        </SelectItem>
                        <SelectItem value="license-verification">
                          License Verification
                        </SelectItem>
                        <SelectItem value="emissions">
                          Emissions Test
                        </SelectItem>
                        <SelectItem value="maintenance">
                          Maintenance Check
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inspectionDate">Inspection Date</Label>
                    <Input id="inspectionDate" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleId">Vehicle ID</Label>
                  <Input id="vehicleId" placeholder="Enter vehicle ID" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inspectorName">Inspector Name</Label>
                  <Input
                    id="inspectorName"
                    placeholder="Enter inspector name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Enter inspection notes"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Checklist Items</Label>
                  <div className="space-y-2">
                    {[
                      "Brakes functioning properly",
                      "Lights and signals operational",
                      "Tires in good condition",
                      "Valid insurance documentation",
                      "Seatbelts functional",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox id={`item-${index}`} />
                        <Label htmlFor={`item-${index}`}>{item}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowNewInspectionForm(false)}
                >
                  Cancel
                </Button>
                <Button>Submit Inspection</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Violations Tab */}
        <TabsContent value="violations">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Violation Tracking</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Record Violation
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Violation ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Vehicle ID</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: "VIO-001",
                      date: "2023-04-10",
                      type: "Expired License",
                      vehicleId: "VEH-123",
                      severity: "High",
                      status: "Unresolved",
                    },
                    {
                      id: "VIO-002",
                      date: "2023-05-22",
                      type: "Missing Documentation",
                      vehicleId: "VEH-456",
                      severity: "Medium",
                      status: "In Review",
                    },
                    {
                      id: "VIO-003",
                      date: "2023-06-15",
                      type: "Safety Violation",
                      vehicleId: "VEH-789",
                      severity: "Critical",
                      status: "Resolved",
                    },
                  ].map((violation) => (
                    <TableRow key={violation.id}>
                      <TableCell>{violation.id}</TableCell>
                      <TableCell>{violation.date}</TableCell>
                      <TableCell>{violation.type}</TableCell>
                      <TableCell>{violation.vehicleId}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            violation.severity === "Critical"
                              ? "destructive"
                              : violation.severity === "High"
                                ? "default"
                                : "outline"
                          }
                        >
                          {violation.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {violation.status === "Resolved" ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          ) : violation.status === "Unresolved" ? (
                            <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                          ) : (
                            <Clock className="h-4 w-4 text-yellow-500 mr-2" />
                          )}
                          {violation.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Penalties Tab */}
        <TabsContent value="penalties">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Penalty Calculation</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Penalty
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Total Penalties</CardTitle>
                <CardDescription>Current fiscal year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,450.00</div>
                <p className="text-sm text-muted-foreground">
                  From 7 violations
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Outstanding Balance</CardTitle>
                <CardDescription>Unpaid penalties</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$750.00</div>
                <p className="text-sm text-muted-foreground">
                  From 2 violations
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Compliance Score</CardTitle>
                <CardDescription>Based on violation history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78/100</div>
                <Progress value={78} className="h-2 mt-2" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Penalty ID</TableHead>
                    <TableHead>Related Violation</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: "PEN-001",
                      violation: "VIO-001",
                      issueDate: "2023-04-15",
                      amount: "$500.00",
                      dueDate: "2023-05-15",
                      status: "Paid",
                    },
                    {
                      id: "PEN-002",
                      violation: "VIO-002",
                      issueDate: "2023-05-25",
                      amount: "$250.00",
                      dueDate: "2023-06-25",
                      status: "Overdue",
                    },
                    {
                      id: "PEN-003",
                      violation: "VIO-003",
                      issueDate: "2023-06-20",
                      amount: "$1,000.00",
                      dueDate: "2023-07-20",
                      status: "Pending",
                    },
                  ].map((penalty) => (
                    <TableRow key={penalty.id}>
                      <TableCell>{penalty.id}</TableCell>
                      <TableCell>{penalty.violation}</TableCell>
                      <TableCell>{penalty.issueDate}</TableCell>
                      <TableCell>{penalty.amount}</TableCell>
                      <TableCell>{penalty.dueDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            penalty.status === "Paid"
                              ? "default"
                              : penalty.status === "Overdue"
                                ? "destructive"
                                : "outline"
                          }
                        >
                          {penalty.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Document Management</h3>
            <Button onClick={() => setShowDocumentUpload(true)}>
              <Upload className="mr-2 h-4 w-4" /> Upload Document
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: "DOC-001",
                      name: "Vehicle Registration",
                      type: "PDF",
                      uploadDate: "2023-03-10",
                      status: "Approved",
                    },
                    {
                      id: "DOC-002",
                      name: "Insurance Certificate",
                      type: "PDF",
                      uploadDate: "2023-04-05",
                      status: "Pending Review",
                    },
                    {
                      id: "DOC-003",
                      name: "Driver's License",
                      type: "Image",
                      uploadDate: "2023-05-12",
                      status: "Rejected",
                    },
                  ].map((document) => (
                    <TableRow key={document.id}>
                      <TableCell>{document.id}</TableCell>
                      <TableCell>{document.name}</TableCell>
                      <TableCell>{document.type}</TableCell>
                      <TableCell>{document.uploadDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            document.status === "Approved"
                              ? "default"
                              : document.status === "Rejected"
                                ? "destructive"
                                : "outline"
                          }
                        >
                          {document.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Document Upload Dialog */}
          <Dialog
            open={showDocumentUpload}
            onOpenChange={setShowDocumentUpload}
          >
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
                <DialogDescription>
                  Upload compliance-related documents for review.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="documentType">Document Type</Label>
                  <Select>
                    <SelectTrigger id="documentType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="registration">
                        Vehicle Registration
                      </SelectItem>
                      <SelectItem value="insurance">
                        Insurance Certificate
                      </SelectItem>
                      <SelectItem value="license">Driver's License</SelectItem>
                      <SelectItem value="inspection">
                        Inspection Report
                      </SelectItem>
                      <SelectItem value="maintenance">
                        Maintenance Record
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="documentName">Document Name</Label>
                  <Input id="documentName" placeholder="Enter document name" />
                </div>
                <div className="space-y-2">
                  <Label>Upload File</Label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">
                      Drag and drop your file here or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supported formats: PDF, JPG, PNG (Max 10MB)
                    </p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Select File
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any additional information"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowDocumentUpload(false)}
                >
                  Cancel
                </Button>
                <Button>Upload</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceModule;
