import React from 'react';
import { ExtractContentResponse } from '@/types/extraction';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Props {
  data: ExtractContentResponse;
}

const TicketExtractDisplay: React.FC<Props> = ({ data }) => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Extracted Ticket Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Package Information</h3>
            <Badge variant="secondary" className="text-base font-medium">
              Package Number: {data.package_number}
            </Badge>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Product Details</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>SAP Product Code</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.product_ID.map((id, index) => (
                  <TableRow key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>{data.product_names[index] || 'N/A'}</TableCell>
                    <TableCell>{data.sap_product_code[index] || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketExtractDisplay;